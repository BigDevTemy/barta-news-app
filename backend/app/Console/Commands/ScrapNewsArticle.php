<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\News;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class ScrapNewsArticle extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'scrape:newsarticle';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Scarpe News Article';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        try {
                $apiUrl = 'https://eventregistry.org/api/v1/article/getArticles';

                for ($page = 1; $page <= 10; $page++) {
                    $payload = [
                        "action" => "getArticles",
                        "keyword" => "",
                        "sourceLocationUri" => [
                            "http://en.wikipedia.org/wiki/United_States",
                            "http://en.wikipedia.org/wiki/Canada",
                            "http://en.wikipedia.org/wiki/United_Kingdom"
                        ],
                        "ignoreSourceGroupUri" => "paywall/paywalled_sources",
                        "lang"=>"eng",
                        "articlesPage" => $page,
                        "articlesCount" => 100,
                        "articlesSortBy" => "date",
                        "articlesSortByAsc" => false,
                        "dataType" => [
                            "news",
                            "pr"
                        ],
                        "forceMaxDataTimeWindow" => 31,
                        "resultType" => "articles",
                        "apiKey" => "deec90fd-8db0-46b1-8111-027ba9911fd4"
                    ];
    
                    $this->info('Fetching articles from the API...');
                    $response = Http::post($apiUrl, $payload);
    
                    if ($response->successful()) {
                        $this->info('API response received successfully.');
                        $resultData = $response->json();
                    
                        if (isset($resultData['articles']['results'])) {
                            $articles = $resultData['articles']['results'];
    
                            foreach ($articles as $article) {
                                $dateTime = Carbon::parse($article['dateTime']);
                                $dateTimePub = Carbon::parse($article['dateTimePub']);
    
                                $newsArticleData = [
                                    'uri' => $article['uri'] ?? null,
                                    'lang' => $article['lang'] ?? 'en',
                                    'is_duplicate' => $article['isDuplicate'] ?? false,
                                    'date' => $dateTime->format('Y-m-d'),
                                    'time' => $dateTime->format('H:i:s'),
                                    'date_time' => $dateTime,
                                    'date_time_pub' => $dateTimePub,
                                    'data_type' => $article['dataType'] ?? 'news',
                                    'sim' => $article['sim'] ?? 0,
                                    'url' => $article['url'] ?? null,
                                    'title' => $article['title'] ?? 'No Title',
                                    'body' => $article['body'] ?? 'No Content',
                                    'source' => json_encode($article['source'] ?? []),
                                    'authors' => json_encode($article['authors'] ?? ['Unknown']),
                                    'image' => $article['image'] ?? null,
                                    'event_uri' => $article['eventUri'] ?? null,
                                    'sentiment' => $article['sentiment'] ?? null,
                                    'wgt' => $article['wgt'] ?? null,
                                    'relevance' => $article['relevance'] ?? null,
                                ];
    
                                // Log for debugging
                                Log::info('Saving article:', $newsArticleData);
    
                                // Save article in the database
                                News::create($newsArticleData);
                                $this->info('Article stored: ' . ($article['title'] ?? 'No Title'));
                            }
                        } 
                        else {
                            $this->warn('No articles found in the API response.');
                        }
                   } else {
                    $this->error('API request failed with status: ' . $response->status());
                    Log::error('API Request Failed', ['response' => $response->body()]);
                   }
                }
                
        } catch (\Exception $e) {
            $this->error('An error occurred: ' . $e->getMessage());
            Log::error('Exception occurred:', ['exception' => $e]);
        }
    }
}
