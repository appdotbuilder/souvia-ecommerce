<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Supplier
 *
 * @property int $id
 * @property string $name
 * @property string|null $contact_person
 * @property string $email
 * @property string|null $phone
 * @property string|null $address
 * @property string|null $city
 * @property string|null $postal_code
 * @property string|null $province
 * @property string|null $notes
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Purchase> $purchases
 * @property-read int|null $purchases_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier query()
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier whereContactPerson($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier wherePostalCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier whereProvince($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Supplier active()
 * @method static \Database\Factories\SupplierFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Supplier extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'contact_person',
        'email',
        'phone',
        'address',
        'city',
        'postal_code',
        'province',
        'notes',
        'status',
    ];

    /**
     * Get the purchases for the supplier.
     */
    public function purchases(): HasMany
    {
        return $this->hasMany(Purchase::class);
    }

    /**
     * Scope a query to only include active suppliers.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}