<?php

namespace App\Http\Requests\Order;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Validator;

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
            ],
            'teamName' => [
                'string' => 'Field :attribute must be a string',
                'min' => 'Field :attribute must be at least :min characters'
            ],
            'teamMembers' => [
                'array' => 'Field :attribute must be an array'
            ],
            'teamMembers.*.name' => [
                'required' => 'Field name is required',
                'string' => 'Field name must be a string',
            ],
            'teamMembers.*.instagram' => [
                'string' => 'Field instagram must be a string',
                'min' => 'Field instagram must be at least :min characters'
            ],
            'teamMembers.*.nickname' => [
                'string' => 'Field nickname must be a string',
                'min' => 'Field nickname must be at least :min characters'
            ],
        ];
    }

    public function rules(): array
    {
        return [
            'email' => 'required|email',
            'name' => 'required|string',
            'phone' => 'required|numeric|min:10',
            'instagram' => 'nullable|string|min:3',
            'nickname' => 'nullable|string|min:3',
            'teamName' => 'nullable|string|min:3',
            'teamMembers' => 'required_unless:teamName,null|array',
            'teamMembers.*.name' => 'required_unless:teamName,null|string',
            'teamMembers.*.instagram' => 'nullable|string|min:3',
            'teamMembers.*.nickname' => 'nullable|string|min:3',
        ];
    }
}
