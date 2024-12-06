<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    // 'paths' => ['api/*', 'sanctum/csrf-cookie'],

    // 'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],

    // 'allowed_origins' => ['http://localhost:5173'],

    // 'allowed_origins_patterns' => [],

    // 'allowed_headers' => ['Content-Type', 'Authorization', 'X-Requested-With'],

    // 'exposed_headers' => [],

    // 'max_age' => 0,

    // 'supports_credentials' => false,
    
        'paths' => ['api/*', 'sanctum/csrf-cookie'],
        'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        'allowed_origins' => ['http://localhost:5173'],  // Frontend URL for local dev
        'allowed_origins_patterns' => [],
        'allowed_headers' => ['Content-Type', 'Authorization', 'X-Requested-With'],
        'exposed_headers' => [],
        'max_age' => 0,
        'supports_credentials' => true,  // Set to true if you need credentials like cookies or Authorization headers
    
    


];
