<?php

namespace App\Http\Requests\Order;

use App\Enums\RoleTypeEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class AddNewTicketOrderRequest extends FormRequest
{
    protected $stopOnFirstFailure = true;

    public function authorize(): bool
    {
        return Auth::check() && Auth::user()->role === RoleTypeEnum::User;
    }

    public function messages()
    {
        return  [
            'amount' => [
                'required' => 'Field :attribute is required',
                'integer' => 'Field :attribute must be an integer',
                'min' => 'Field :attribute value must be at least :min'
            ]
        ];
    }

    public function rules(): array
    {
        return [
            'amount' => 'required|integer|min:1'
        ];
    }
}
