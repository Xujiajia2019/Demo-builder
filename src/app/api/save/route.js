import { NextResponse } from 'next/server';
import { supabase } from '/api'


export async function POST(req) {
  if (req.method === "POST") {
    const request = await req.json()
    const imageJson = request.data

    if (imageJson !== undefined) {
      const { data, error } = await supabase
        .from('Page data')
        .insert({
          data: imageJson
        })
        .select()
      if (error) {
        return NextResponse.json({error, status:401});
      } else {
        return NextResponse.json({data});
      }
    } else {
      return NextResponse.json({ error: "Missing parameters", status:400 });
    }
  } else {
    return NextResponse.json({ error: "Method not allowed", status:405 });
  }
};
