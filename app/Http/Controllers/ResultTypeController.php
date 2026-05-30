<?php

namespace App\Http\Controllers;

use App\Http\Resources\ResultTypeResource;
use App\Models\ResultType;
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

    public function show(ResultType $resultType): ResultTypeResource
    {
        return ResultTypeResource::make($resultType->load('branches'));
    }
}
