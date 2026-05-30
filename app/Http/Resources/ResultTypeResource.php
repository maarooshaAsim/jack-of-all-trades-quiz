<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResultTypeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'parent_id' => $this->parent_id,
            'slug' => $this->slug,
            'name' => $this->name,
            'description' => $this->description,
            'base_color' => $this->base_color,
            'accent_color' => $this->accent_color,
            'graph_path' => $this->graph_path,
            'sort_order' => $this->sort_order,
            'breadth' => [
                'percentage' => $this->breadth_percentage,
                'description' => $this->breadth_description,
            ],
            'output' => [
                'percentage' => $this->output_percentage,
                'description' => $this->output_description,
            ],
            'depth' => [
                'percentage' => $this->depth_percentage,
                'description' => $this->depth_description,
            ],
            'recognition' => [
                'percentage' => $this->recognition_percentage,
                'description' => $this->recognition_description,
            ],
            'integration' => [
                'percentage' => $this->integration_percentage,
                'description' => $this->integration_description,
            ],
            'branches' => ResultTypeResource::collection($this->whenLoaded('branches')),
        ];
    }
}
