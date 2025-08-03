<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
            'city' => 'required|string|max:255',
            'postal_code' => 'required|string|max:10',
            'province' => 'required|string|max:255',
            'payment_method' => 'required|in:bank_transfer,cod',
            'notes' => 'nullable|string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Full name is required.',
            'email.required' => 'Email address is required.',
            'email.email' => 'Please provide a valid email address.',
            'phone.required' => 'Phone number is required.',
            'address.required' => 'Shipping address is required.',
            'city.required' => 'City is required.',
            'postal_code.required' => 'Postal code is required.',
            'province.required' => 'Province is required.',
            'payment_method.required' => 'Please select a payment method.',
            'payment_method.in' => 'Invalid payment method selected.',
        ];
    }
}