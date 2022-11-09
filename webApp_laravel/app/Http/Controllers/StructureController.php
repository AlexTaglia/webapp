<?php

namespace App\Http\Controllers;

use App\Models\Structure;
use App\Models\Exam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StructureController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Structure::select('id','name','region','city', 'phone')->paginate(10);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=>'required',
            'region'=>'required',
            'city'=>'required',
            'phone'=>'required',
        ]);


        try{
            $data = $request->all();

            $structure = new Structure;
            $structure->name = $data['name'];
            $structure->region = $data['region'];
            $structure->city = $data['city'];

            $structure->fill($data);
            $structure->save();      

            $ids = json_decode($data['examsId'], TRUE);
                       
            if(array_key_exists('examsId', $data)) {
                foreach ($ids as &$value) {
                    $exams = Exam::find([$value]);
                    $structure->exam()->attach($exams);
                }
            }
            
            if(array_key_exists('sponsors',$data)){
                $structure->sponsors()->sync($data['sponsors']);
            }
            
            return response()->json([
                'message'=>'Structure created Successfully!!'
            ]);
        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while creating a structure!!'
            ],500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Structure  $structure
     * @return \Illuminate\Http\Response
     */
    public function show(Structure $structure)
    {
        $structureId = $structure['id'];
        $exams = Exam::all();
        $structureexams = Exam::join("structure_exam", "exams.id", "=", "structure_exam.exam_id")
                                        ->where("structure_exam.structure_id", "=", $structureId)
                                        ->get();
 
        return response()->json(
            ['structure'=>$structure,
            'exams'=>$exams,
            'structureexams'=>$structureexams]
        );

        return response()->json([
            'structure'=>$structure
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Structure  $structure
     * @return \Illuminate\Http\Response
     */
    public function edit(Structure $structure)
    {
        $structure = Structure::all();
        $exams = Exams::all();
        $structureexams = DB::table('structure_structureexams')->get();
         
        return response()->json([
            'structure'=>$structure],
            ['exams'=>$exams],
            ['structureexams'=>$structureexams
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Structure  $structure
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Structure $structure)
    {
        $request->validate([
            'name'=>'required',
            'region'=>'required',
            'city'=>'required',
            'phone'=>'required',
            'exam_id' => 'nullable',
            'sponsor_id' => 'nullable',
        ]);

        try{

            $structure->fill($request->post())->update();
            $structure->save();
            
            return response()->json([
                'message'=>'Structure Updated Successfully!!'
            ]);

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while updating a structure!!'
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Structure  $structure
     * @return \Illuminate\Http\Response
     */
    public function destroy(Structure $structure)
    {
        $structure->delete();
        return response()->json([
            'message'=>'Structure deleted successfully!!'
        ]);

    }

    public function search(Request $request)
    {
        $city = $request->input('city');
        $region = $request->input('region');
        $exam = $request->input('exam'); 

        
        if($city === NULL || $region === NULL){
                $structures =  Structure::select("*")
                ->where([
                    ["city", "like", '%'.$city.'%'],
                ])->where([
                    ["region", "like", '%'.$region.'%'],
                ])
                ->get();
            } else {
                $structures =  Structure::select('id','name','region','city', 'phone');
            } 

        return response()->json([
            'data'=>$structures
        ]);

    }

}
