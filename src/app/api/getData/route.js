import { NextResponse } from 'next/server';
import { supabase } from '/api'

export async function GET(req) {
  if (req.method === "GET") {
    let {data, error} = await supabase
      .from('Page data')
      .select('data')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    if (error) {
      return NextResponse.json({error})
    } else {
      const resultData = JSON.stringify(data.data);
      return NextResponse.json(resultData);
    }
  } else {
    return NextResponse.json({ error: "Method not allowed", status:405 });
  }
};
