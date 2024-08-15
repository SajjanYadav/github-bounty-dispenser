import dbConnect from "@/lib/dbConnect";
import Bounty from "@/model/Bounty";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import mongoose from "mongoose";

export async function POST(req : Request, res : NextRequest) {

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

        const {github_repo, github_issue, amount, created_by} : 
            {
                github_repo : string, 
                github_issue: string, 
                amount : string,
                created_by : string
            } = await req.json();

        if (!github_repo || !github_issue || !amount || !created_by) {
            return NextResponse.json({
                success: false,
                message: "Missing required fields",
            }, { status: 400 });
        }

        console.log({github_repo, github_issue, amount, created_by})

        const existingBounty = await Bounty.findOne({github_repo, github_issue, amount, created_by});
        console.log(existingBounty);

        if(existingBounty){
            return NextResponse.json({
                success: false,
                message: "Cannot create a bounty. Bounty Already Exists"
            }, {status : 401})
        }

        const newBounty = await Bounty.create({
            amount: amount,
            github_repo : github_repo,
            github_issue: github_issue, 
            created_by: new mongoose.Types.ObjectId(created_by),
            created_at: Date.now(),
        })

        if (!newBounty) {
            return NextResponse.json({
                success: false,
                message: "Cannot create a bounty. Please try again later"
            }, {status : 401})
        }

        return NextResponse.json({
            success: true,
            message: "Bounty created successfully", 
            bounty : newBounty,
        }, {status : 200})


    } catch (error) {
        console.log("Error occured while creating new bounty",error)
        return NextResponse.json({
            success: false,
            message: "Internal Server Errror"
        }, {status : 500})
    }
}
