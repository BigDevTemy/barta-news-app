<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Traits\HttpResponses;
use App\Models\User;
use App\Models\UserPreferences;
use Illuminate\Support\Facades\Validator;
use Hash;
use Auth;
class AuthController extends Controller
{
    //
    use HttpResponses;

    public function login(Request $request)

    {
        
        $credentials = $request->only('email', 'password');
        try {
            if (!$token = JWTAuth::attempt($credentials)) {

                //return response()->json(['error' => 'invalid_credentials'], 401);
                return $this->error("","Invalid Credentials",401);
            }
        } catch (JWTException $e) {
            //return response()->json(['error' => 'could_not_create_token'], 500);
            return $this->error("","Could Not Create Token",500);
        }
        $user = Auth::user();
        $user_preference =  UserPreferences::where('user_id',$user->id)->first();
        return $this->success([
            'token' => $token,
            'user' => $user,
            'user_preference'=>$user_preference
        ], "Login Successful");
        //return response()->json(compact('token'));
    }
    public function register(Request $request){

        $validator = Validator::make($request->all(), [
            'fullname' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
            
        ]);
        
        if ($validator->fails()) {
            //return response()->json($validator->messages());
            return $this->error($validator->messages(),"Validation Error",401);
        }

        $data = $request->all();
        $password = Hash::make($request->input('password'));

        $user= User::create([
            "email" => $request->input('email'),
            "name"=>$request->input('fullname'),
            "password"=>$password
        ]);

       

        return $this->success($user);
    }

    public function refresh()
    {
        try {
            // Attempt to refresh the token
            $newToken = JWTAuth::refresh(JWTAuth::getToken());
        } catch (JWTException $e) {
            return $this->error("", "Could not refresh token", 500);
        }

        return $this->success([
            'token' => $newToken,
        ], "Token refreshed successfully");
    }

    public function logout()
    {
        //JWTAuth::invalidate(JWTAuth::getToken());
       // return response()->json(['message' => 'Successfully logged out']);
       return $this->success("","successfully logged out");
    }

    public function me()
    {
        // return response()->json(auth()->user());
        return $this->success(auth()->user(),"success response");
    }


}
