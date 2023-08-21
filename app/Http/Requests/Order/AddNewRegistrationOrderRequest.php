<?php

namespace App\Http\Requests\Order;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class AddNewRegistrationOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check();
    }

    public function messages()
    {
        return [
            'email' => [
                'required' => 'Field :attribute is required',
                'email' => 'Invalid email provided',
            ],
            'name' => [
                'required' => 'Field :attribute is required',
                'string' => 'Field :attribute must be a string',
            ],
            'phone' => [
                'required' => 'Field :attribute is required',
                'numeric' => 'Field :attribute must be a numeric values',
                'min' => 'Field :attribute must be at least :min characters'
            ],
            'instagram' => [
                'string' => 'Field :attribute must be a string',
                'min' => 'Field :attribute must be at least :min characters'
            ],
            'nickname' => [
                'string' => 'Field :attribute must be a string',
                'min' => 'Field :attribute must be at least :min characters'
            ]
        ];
    }

    public function rules(): array
    {
        return [
            'email' => 'required|email',
            'name' => 'required|string',
            'phone' => 'required|numeric|min:10',
            'instagram' => 'nullable|string|min:3',
            'nickname' => 'nullable|string|min:3'
        ];
    }
}
