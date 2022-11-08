<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Exam;
use App\Models\Structure;

class SearchController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function search()
    // public function search(Request $request)
    {
        $structures = Structure::all();
        // $structures = $structures->where('name', 'LIKE', '%' . $request . '%')
        //      ->paginate(10);

        return response()->json([
            'data'=>$structures
        ]);
    }

}
