<?php

namespace App\Http\Controllers;

use App\Http\Resources\ResultTypeResource;
use App\Models\ResultType;
use App\Support\ResultTypeSlug;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ResultTypeController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return ResultTypeResource::collection(
            ResultType::query()
                ->whereNull('parent_id')
                ->with('branches')
                ->orderBy('sort_order')
                ->get(),
        );
    }

    public function show(string $resultType): ResultTypeResource
    {
        $resolvedResultType = ResultType::query()
            ->where('slug', ResultTypeSlug::resolve($resultType))
            ->with('branches')
            ->firstOrFail();

        return ResultTypeResource::make($resolvedResultType);
    }
}
