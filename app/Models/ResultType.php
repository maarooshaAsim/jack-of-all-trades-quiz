<?php

namespace App\Models;

use Database\Factories\ResultTypeFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ResultType extends Model
{
    /** @use HasFactory<ResultTypeFactory> */
    use HasFactory;

    protected $guarded = [];

    /**
     * @return BelongsTo<ResultType, $this>
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    /**
     * @return HasMany<ResultType, $this>
     */
    public function branches(): HasMany
    {
        return $this->hasMany(self::class, 'parent_id')->orderBy('sort_order');
    }
}
