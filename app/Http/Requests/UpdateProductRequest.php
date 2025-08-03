<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:products,slug,' . $this->route('product')->id,
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'min_stock' => 'required|integer|min:0',
            'sku' => 'required|string|max:255|unique:products,sku,' . $this->route('product')->id,
            'images' => 'nullable|array',
            'variations' => 'nullable|array',
            'weight' => 'nullable|numeric|min:0',
            'shipping_origin' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
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
            'category_id.required' => 'Category is required.',
            'category_id.exists' => 'Selected category does not exist.',
            'name.required' => 'Product name is required.',
            'slug.required' => 'Product slug is required.',
            'slug.unique' => 'This slug is already taken by another product.',
            'description.required' => 'Product description is required.',
            'price.required' => 'Product price is required.',
            'price.numeric' => 'Price must be a valid number.',
            'price.min' => 'Price cannot be negative.',
            'stock.required' => 'Stock quantity is required.',
            'stock.integer' => 'Stock must be a whole number.',
            'stock.min' => 'Stock cannot be negative.',
            'sku.required' => 'SKU is required.',
            'sku.unique' => 'This SKU is already taken by another product.',
        ];
    }
}