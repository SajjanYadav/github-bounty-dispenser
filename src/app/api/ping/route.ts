import { NextRequest, NextResponse } from 'next/server';


export async function GET(req : NextRequest, res : NextResponse) {
    
    return NextResponse.json({
        success: true,
    }, {status: 200})
} 
