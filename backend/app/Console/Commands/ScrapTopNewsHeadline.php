<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\TopHeadlines;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class ScrapTopNewsHeadline extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'scrape:topheadline';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Scrape topheadline news articles from an API and store them in the database';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        try{

            $apiUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=e0922de291d54e6dab35df0c06851551';  // Replace with your actual API URL
        
            // Define the data to be sent in the POST request (if any)
             $response = Http::get($apiUrl);
            if($response->successful()){
                $articles = $response->json()['articles'];
                foreach ($articles as $article) {
                    
                    $dateTime = Carbon::parse($article['publishedAt']);

                    // Prepare the data for insertion into the database
                    $headlines = [
                        'title' => $article['title'],
                        'source_name' => json_encode($article['source']),  // Store the 'source' as JSON
                        'author' => json_encode([$article['author']]),
                        'url' => $article['url'],
                        'description' => $article['description'],
                        'url_to_image' => $article['urlToImage'],
                        'published_at' => $dateTime,  // Assuming event URI is not provided
                        'content' => $article['content'],  // Assuming sentiment is not provided
                        
                    ];
                    Log::info($headlines);
                    TopHeadlines::create($headlines);
                    $this->info('News articles have been successfully scraped and stored in the database.');
                }
                $this->info('News articles have been successfully scraped and stored in the database.');
            }
            else{
                $this->error('Failed to retrieve data from the API.');
            }
        }
        catch(\Exception $e){
            $this->error('An Error occurred'.$e->getMessage());
        }

    }
        
}
