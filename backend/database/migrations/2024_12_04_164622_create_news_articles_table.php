<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('news_articles', function (Blueprint $table) {
            $table->id();
            $table->string('uri')->nullable(); // URI of the article
            $table->string('lang')->nullable(); // Language of the article (e.g., 'fra')
            $table->boolean('is_duplicate')->default(false); // Duplicate flag
            $table->date('date')->nullable(); // Date of the article
            $table->time('time')->nullable(); // Time of the article publication
            $table->timestamp('date_time')->nullable(); // Complete datetime of article creation
            $table->timestamp('date_time_pub')->nullable(); // DateTime published
            $table->string('data_type')->nullable(); // Type of the data (e.g., 'news')
            $table->integer('sim')->default(0); // Similarity index (optional)
            $table->longText('url'); // URL of the article
            $table->string('title'); // Title of the article
            $table->text('body')->nullable(); // Body/content of the article
            $table->json('source')->nullable(); // Source data (includes source name and uri)
            $table->json('authors')->nullable(); // Authors, which can be an empty array
            $table->string('image')->nullable(); // Image URL related to the article
            $table->string('event_uri')->nullable(); // Event URI, if applicable
            $table->text('sentiment')->nullable(); // Sentiment, if applicable
            $table->bigInteger('wgt')->nullable(); // Weight (optional)
            $table->float('relevance', 8, 2)->nullable(); // Relevance (optional)
            $table->timestamps(); // Created at and updated at columns
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('news_articles');
    }
};
