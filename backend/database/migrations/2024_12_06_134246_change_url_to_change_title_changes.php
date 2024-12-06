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
        Schema::table('top_headlines', function (Blueprint $table) {
            //
            $table->longtext('source_name')->nullable()->change();
            $table->longText('title')->change();
            $table->longText('url')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('top_headlines', function (Blueprint $table) {
            //
            $table->string('source_name')->nullable()->change();
            $table->string('title')->change();
            $table->string('url')->change();
        });
    }
};
