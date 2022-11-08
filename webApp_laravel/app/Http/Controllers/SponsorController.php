<?php

namespace App\Http\Controllers;

use App\Models\Sponsor;
use Illuminate\Http\Request;

class SponsorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // TODO
        // return Sponsor::select('id','duration')->get();
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
        // TODO
        // $request->validate([
        //     'duration'=>'required',
        //     'structure_id' => 'nullable',
        // ]);

        // try{
        //     Sponsor::create($request->post());
        //     return response()->json([
        //         'message'=>'Sponsor created successfully!!'
        //     ]);
        // }catch(\Exception $e){
        //     \Log::error($e->getMessage());
        //     return response()->json([
        //         'message'=>'Something goes wrong while creating a sponsor!!'
        //     ],500);
        // }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Sponsor  $sponsor
     * @return \Illuminate\Http\Response
     */
    public function show(Sponsor $sponsor)
    {
        // TODO
        // return response()->json([
        //     'sponsor'=>$sponsor
        // ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Sponsor  $sponsor
     * @return \Illuminate\Http\Response
     */
    public function edit(Sponsor $sponsor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Sponsor  $sponsor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Sponsor $sponsor)
    {
        // TODO
        // $request->validate([
        //     'duration'=>'required',
        //     'structure_id' => 'required',
        // ]);

        // try{

        //     $exam->fill($request->post())->update();
        //     $exam->save();
            

        //     return response()->json([
        //         'message'=>'Exam Updated Successfully!!'
        //     ]);

        // }catch(\Exception $e){
        //     \Log::error($e->getMessage());
        //     return response()->json([
        //         'message'=>'Something goes wrong while updating a exam!!'
        //     ],500);
        // }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Sponsor  $sponsor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Sponsor $sponsor)
    {
        //
    }

    public function subscribe(Request $request, $id, $structuredId)
    {
        // TODO
        // $structure = Structure::find($structuredId);
        // $sponsors = Sponsor::all();
        
        // $payload = $request->input('payload', false);
        // $nonce = 'fake-valid-nonce';
      
        // $duration = DB::table("sponsors")
        //             ->select("duration")
        //             ->where("id", "=", $id)
        //             ->get();
                    
        // $hours = $duration->first()->duration;  

        // $now = date_create()->format('Y-m-d H:i:s');

        // $lastSponsorDate = DB::table('structure_sponsor')
        //                     ->select('end_on')
        //                     ->where('structure_id', '=', $structuredId)
        //                     ->where('end_on', '>=', $now)
        //                     ->orderBy('end_on', 'DESC')     
        //                     ->limit(1)
        //                     ->first();

        // $countRowDb = DB::table('structure_sponsor')
        //                 ->select('end_on')
        //                 ->where('structure_id', '=', $structuredId)
        //                 ->get()
        //                 ->count();
        
        // if($countRowDb == 0 or $now > $lastSponsorDate->end_on){
        //     $startDate = $now;
        // } else{
        //     $startDate = $lastSponsorDate->end_on;
        // };

        // $end = date('Y-m-d H:i:s', strtotime("$startDate +{$hours} hours"));

        // if($result->success) {

        //     $structure = Structure::find($structuredId);
        //     $structure->sponsor()->attach($id,[
        //     'status' => true,
        //     'started_on' => $startDate,
        //     'end_on' => $end]); 
                        
        //     return response()->json(['success' => true]); 
            
        // } else {
        //     return response()->json(['success' => false]);
        // }
    }
}
