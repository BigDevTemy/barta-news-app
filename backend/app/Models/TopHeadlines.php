<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TopHeadlines extends Model
{
    use HasFactory;

    protected $fillable = [
        'source_name',       // The name of the source
        'source_id',         // The ID of the source
        'author',            // The author of the article
        'title',             // Title of the article
        'description',       // Description of the article
        'url',               // URL of the article
        'url_to_image',      // URL to the image
        'published_at',      // Published date of the article
        'content',           // Content of the article
    ];
}
