<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\News;
use App\Models\UserPreferences;
use App\Models\TopHeadlines;
use Illuminate\Support\Facades\Validator;
use App\Traits\HttpResponses;
use Tymon\JWTAuth\Facades\JWTAuth;

use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;


use Auth;
class UserPreference extends Controller
{
    //
    use HttpResponses;

    public function save_preference(Request $request)
    {
      
       
    
        $attributes = [
            'user_id' => Auth::user()->id,
        ];
    
        // Attempt to decode the JSON string
        $selectedCategories = json_decode($request->input('selectedCategories'), true);
    
        // Debugging: Log the selected categories
        \Log::info('Selected categories:', $selectedCategories);
    
        // Check if decoding was successful
        if (json_last_error() !== JSON_ERROR_NONE) {
            return $this->error("Invalid JSON format for selectedCategories", 400);
        }
    
        // Define the values to update or set
        $values = [
            'preferred_categories' => json_encode($selectedCategories),
          
        ];
    
        $user_preference = UserPreferences::updateOrCreate($attributes, $values);
        return $this->success($user_preference);
    }

    public function save_source(Request $request)
    {
      
        $attributes = [
            'user_id' => Auth::user()->id,
        ];
    
        // Attempt to decode the JSON string
        $selectedSources = json_decode($request->input('selectedSources'), true);
    
    
        // Check if decoding was successful
        if (json_last_error() !== JSON_ERROR_NONE) {
            return $this->error("Invalid JSON format for selectedCategories", 400);
        }
    
        // Define the values to update or set
        $values = [
            'preferred_source' => json_encode($selectedSources),
          
        ];
    
        $user_preference = UserPreferences::updateOrCreate($attributes, $values);
        return $this->success($user_preference);
    }
    public function save_author(Request $request)
    {
      
       
        $attributes = [
            'user_id' => Auth::user()->id,
        ];
    
        // Attempt to decode the JSON string
        $selectedAuthors = json_decode($request->input('selectedAuthors'), true);
    
   
    
        // Check if decoding was successful
        if (json_last_error() !== JSON_ERROR_NONE) {
            return $this->error("Invalid JSON format for selectedCategories", 400);
        }
    
        // Define the values to update or set
        $values = [
            'preferred_authors' => json_encode($selectedAuthors),
          
        ];
    
        $user_preference = UserPreferences::updateOrCreate($attributes, $values);
        return $this->success($user_preference);
    }

    public function getNewSources(){

        $newsAuthorSources = News::select('source','authors')->get();
        return $this->success($newsAuthorSources);
        
    }

    public function getNewsHeadline(){

       $user = null;
       try {
        // Attempt to parse the token
        $user = JWTAuth::parseToken()->authenticate();
        } catch (TokenExpiredException $e) {
            // Token is expired, handle accordingly
            //return response()->json(['message' => 'Token expired'], 401);
        } catch (TokenInvalidException $e) {
            // Token is invalid, handle accordingly
            //return response()->json(['message' => 'Token invalid'], 401);
        } catch (JWTException $e) {
            // No token present, proceed as a guest
        }
        $preferredAuthors = $user ? json_decode($user->preferred_authors, true) : [];
        $preferredSources = $user ? json_decode($user->preferred_source, true) : [];

        $topheadline = TopHeadlines::whereNotNull('url_to_image')
        ->latest()
        ->take(5)
        ->get();

        $topStoriesQuery = News::whereNotNull('image')->inRandomOrder();
        $recentNewsQuery = News::whereNotNull('image')->inRandomOrder();
        $lifestyleQuery = News::whereNotNull('image')->inRandomOrder();
        $breakQuery = News::whereNotNull('image')->inRandomOrder();
        $featuredNewsQuery = News::whereNotNull('image')->inRandomOrder();

        if ($preferredAuthors || $preferredSources) {
            // Apply filters based on authors and sources
            $topStoriesQuery->where(function ($query) use ($preferredAuthors, $preferredSources) {
                if ($preferredAuthors) {
                    $query->whereJsonContains('authors', $preferredAuthors);
                }
                if ($preferredSources) {
                    $query->whereJsonContains('source->uri', $preferredSources);
                }
            });
        
            $recentNewsQuery->where(function ($query) use ($preferredAuthors, $preferredSources) {
                if ($preferredAuthors) {
                    $query->whereJsonContains('authors', $preferredAuthors);
                }
                if ($preferredSources) {
                    $query->whereJsonContains('source->uri', $preferredSources);
                }
            });
        
            $lifestyleQuery->where(function ($query) use ($preferredAuthors, $preferredSources) {
                if ($preferredAuthors) {
                    $query->whereJsonContains('authors', $preferredAuthors);
                }
                if ($preferredSources) {
                    $query->whereJsonContains('source->uri', $preferredSources);
                }
            });
        
            $breakQuery->where(function ($query) use ($preferredAuthors, $preferredSources) {
                if ($preferredAuthors) {
                    $query->whereJsonContains('authors', $preferredAuthors);
                }
                if ($preferredSources) {
                    $query->whereJsonContains('source->uri', $preferredSources);
                }
            });
        
            $featuredNewsQuery->where(function ($query) use ($preferredAuthors, $preferredSources) {
                if ($preferredAuthors) {
                    $query->whereJsonContains('authors', $preferredAuthors);
                }
                if ($preferredSources) {
                    $query->whereJsonContains('source->uri', $preferredSources);
                }
            });
        }

        $topStories = $topStoriesQuery->take(5)->get();
        $recentNews = $recentNewsQuery->take(6)->get();
        $lifestyle = $lifestyleQuery->take(4)->get();
        $break = $breakQuery->take(4)->get();
        $featuredNews = $featuredNewsQuery->take(7)->get();

        
        return $this->success([
            "topheadline"=>$topheadline,
            "topStories"=>$topStories,
            "recentNews"=>$recentNews,
            "lifestyle"=>$lifestyle,
            "break"=>$topStories,
            "featurednews"=>$featuredNews,
        ]);
        
    }

    public function search_query(Request $request){
        $query = $request->input('query');

        if (empty($query)) {
            //return response()->json(['message' => 'Query parameter is required'], 400);
            // return $this->error("","Query parameter is required");
            return $this->error("","Query parameter is required",500);
        }
        $terms = explode(' ', $query); // Split the query into individual words

    // Search the `News` table for matches in title, body, or source_name
        
        $results = News::select('title','image','body')->where(function($q) use ($terms) {
            foreach ($terms as $term) {
                $lowerTerm = strtolower($term);
                $q->orWhereRaw('LOWER(title) LIKE ?', ["%{$lowerTerm}%"])
                  ->orWhereRaw('LOWER(body) LIKE ?', ["%{$lowerTerm}%"])
                  ->orWhereRaw('LOWER(url) LIKE ?', ["%{$lowerTerm}%"]);
            }
        })->get();


    
        // Return the results as a JSON response

        return $this->success($results);
        
    }

}
