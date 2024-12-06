<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsArticles extends Model
{
    use HasFactory;
    protected $fillable = [
        'uri', 
        'lang', 
        'is_duplicate', 
        'date', 
        'time', 
        'date_time', 
        'date_time_pub', 
        'data_type', 
        'sim', 
        'url', 
        'title', 
        'body', 
        'source', 
        'authors', 
        'image', 
        'event_uri', 
        'sentiment', 
        'wgt', 
        'relevance'
    ];
}
