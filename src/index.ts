import { callCreateAstroAPI, callGoalApi } from "./services/apiService";
import { Astro, AstroType, astroColors } from "./types/astro";
import { delay } from "./utils/utils";

async function runProject() {
  try {
    const mapResponse = await callGoalApi();

    //If we do have a response from goalResponse, we continue
    if(mapResponse !== undefined && mapResponse.goal.length !== 0)
    {
        let astros : Astro[] = []
        mapResponse.goal.forEach((row, rowIndex) => {
            row.forEach(async (item, columnIndex) => {
                if(item !== "SPACE")
                {
                    let astro : Astro = {row: rowIndex, column: columnIndex, type: AstroType.POLYANET, color: "", direction: ""}
                    
                    if(item.includes("_")){
                        const [itemAttribute, itemTypeStr] = item.split("_")
                        const lowerItemAttribute = itemAttribute.toLowerCase()
                        const itemValueType = AstroType[itemTypeStr as keyof typeof AstroType]
                        
                        if(astroColors.includes(lowerItemAttribute))
                            astro = {...astro, type: itemValueType, color: lowerItemAttribute}
                        else
                            astro = {...astro, type: itemValueType, direction: lowerItemAttribute}
                    }
                    
                    astros.push(astro)
                }
            })
        })

        //Move the logic to create all the astros in one process.
        for(const astro of astros)
        {
            const result = await callCreateAstroAPI(astro)
            if(!result) throw new Error("Fail to create astro using API.")
            await delay(1000)
        }
        
    }

  } catch (error: any) {
    console.error('Error running the project:', error.message);
  }
}

// Run the project
runProject();