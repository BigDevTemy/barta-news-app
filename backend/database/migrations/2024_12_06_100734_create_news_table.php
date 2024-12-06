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
        Schema::create('news', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('uri')->unique(); // Unique identifier for the flight
            $table->string('lang', 10)->nullable(); // Language code
            $table->boolean('is_duplicate')->default(false); // Duplicate status
            $table->date('date')->nullable(); // Date of the data
            $table->time('time')->nullable(); // Time of the data
            $table->timestamp('date_time')->nullable(); // Combined date and time
            $table->timestamp('date_time_pub')->nullable(); // Publication date and time
            $table->string('data_type', 50)->nullable(); // Data type
            $table->decimal('sim', 10, 2)->default(0); // Similarity score
            $table->longText('url')->nullable(); // URL for the source
            $table->longText('title'); // Title of the entry
            $table->text('body')->nullable(); // Body content
            $table->json('source')->nullable(); // JSON object for the source
            $table->json('authors')->nullable(); // JSON array for authors
            $table->longText('image')->nullable(); // Image URL
            $table->longText('event_uri')->nullable(); // Event URI
            $table->decimal('sentiment', 5, 2)->nullable(); // Sentiment score
            $table->bigInteger('wgt')->nullable(); // Weight
            $table->longText('relevance', 5, 2)->nullable(); // Relevance score

            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('news');
    }
};
