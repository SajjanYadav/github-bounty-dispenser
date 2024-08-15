import dbConnect from "@/lib/dbConnect";
import Bounty from "@/model/Bounty";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import mongoose from "mongoose";

export async function GET(req : NextRequest, res : NextRequest) {

    // const session = await getServerSession(authOptions);

    // if (!session || !session.user) {
    //     return NextResponse.json({
    //         success: false,
    //         message: "Unauthorized access",
    //     }, {status: 403});
    // }

    // const userId = session._id;


    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);

        const github_repo = searchParams.get('github_repo');
        const userId = searchParams.get('createdBy');


        if (!github_repo  || !userId) {
            console.log(github_repo, userId);
            return NextResponse.json({
                success: false,
                message: "Missing required fields",
            }, { status: 400 });
        }

        console.log({github_repo, userId})


        const issues = await Bounty.find(
            {
                github_repo: github_repo,
                created_by : new mongoose.Types.ObjectId(userId),
            },
            
        )

        console.log(issues);

        if (!issues) {
            return NextResponse.json({
                success: false,
                message: "No issues for this repo present"
            }, {status : 401})
        }

        return NextResponse.json({
            success: true,
            message: "Issues fetched successfully", 
            issues: issues,
        }, {status : 200})


    } catch (error) {
        console.log("Error occured while creating new bounty",error)
        return NextResponse.json({
            success: false,
            message: "Internal Server Errror"
        }, {status : 500})
    }
}
