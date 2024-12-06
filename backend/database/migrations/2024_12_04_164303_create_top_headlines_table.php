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
        Schema::create('top_headlines', function (Blueprint $table) {
            $table->id();
            $table->longtext('source_name')->nullable(); // The name of the source
            $table->string('source_id')->nullable(); // The ID of the source
            $table->string('author')->nullable(); // The author of the article
            $table->longText('title'); // Title of the article
            $table->text('description')->nullable(); // Description of the article
            $table->longText('url'); // URL of the article
            $table->string('url_to_image')->nullable(); // URL to the image
            $table->timestamp('published_at'); // Published date of the article
            $table->text('content')->nullable(); // Content of the article
            $table->timestamps(); // Laravel's default created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('top_headlines');
    }
};
