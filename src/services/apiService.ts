import dotenv from "dotenv";
import { Astro, AstroType } from "../types/astro";
import { GoalResponse } from "../types/goal";
import { getAPIUrlByAstro } from "../utils/utils";

// Load environment variables from .env file
dotenv.config();

const { API_URL, CANDIDATE_ID } = process.env;

export async function callGoalApi(): Promise<GoalResponse> {
  try {
    const url = `${API_URL}/map/${CANDIDATE_ID}/goal`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const data = await response.json();
    if(data.error) {
        throw new Error(`Failed to fetch data. Status: ${data.error}`)
    }
    return data;
  } catch (error:any) {
    console.error('Error calling GOAL API:', error.message);
    throw error;
  }
}

export async function callCreateAstroAPI(astro: Astro): Promise<boolean> {
    try
    {
        const url = getAPIUrlByAstro(astro.type, API_URL)
        
        const body = { ...astro, candidateId: CANDIDATE_ID };

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });
    
        if (!response.ok) {
          throw new Error(`Failed to generate astro ${astro.type}. Status: ${response.status}`);
        }

        return true
    }
    catch(error: any) {
        console.error(`Error calling ${astro.type} API. ErrorMessage: ${error.message}`);
        throw error;
    }
}