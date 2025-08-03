<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Purchase
 *
 * @property int $id
 * @property string $purchase_number
 * @property int $supplier_id
 * @property \Illuminate\Support\Carbon $purchase_date
 * @property string $status
 * @property float $subtotal
 * @property float $tax_amount
 * @property float $shipping_cost
 * @property float $total_amount
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $received_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Supplier $supplier
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\PurchaseItem> $purchaseItems
 * @property-read int|null $purchase_items_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase query()
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase wherePurchaseDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase wherePurchaseNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase whereReceivedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase whereShippingCost($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase whereSubtotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase whereSupplierId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase whereTaxAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase whereTotalAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Purchase whereUpdatedAt($value)
 * @method static \Database\Factories\PurchaseFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Purchase extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'purchase_number',
        'supplier_id',
        'purchase_date',
        'status',
        'subtotal',
        'tax_amount',
        'shipping_cost',
        'total_amount',
        'notes',
        'received_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'purchase_date' => 'date',
        'subtotal' => 'decimal:2',
        'tax_amount' => 'decimal:2',
        'shipping_cost' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'received_at' => 'datetime',
    ];

    /**
     * Get the supplier that owns the purchase.
     */
    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    /**
     * Get the purchase items for the purchase.
     */
    public function purchaseItems(): HasMany
    {
        return $this->hasMany(PurchaseItem::class);
    }
}