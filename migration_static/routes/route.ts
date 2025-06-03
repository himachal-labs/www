// Fallback Apple App Site Association file handler for Universal Links
// This file is served at /apple-app-site-association as a fallback

/**
 * Fallback Apple App Site Association file handler for Universal Links
 * This file is served at /apple-app-site-association as a fallback
 * Apple may check this location if /.well-known/apple-app-site-association is not found
 */

// Configuration - must match the .well-known version
const TEAM_ID = "D8NYN6GSAF";
const BUNDLE_ID = "com.vastsilicon.FinanceManager";  // Kept same bundle ID through rebranding

/**
 * Generate the Apple App Site Association file content
 * @returns The AASA JSON content
 */
function getAASAContent() {
  const appID = `${TEAM_ID}.${BUNDLE_ID}`;
  
  return {
    "applinks": {
      "apps": [],
      "details": [
        {
          "appID": appID,
          "paths": [
            "/invite/friend/*",
            "/invite/group/*",
            "/process-receipt/*"
          ]
        }
      ]
    }
  };
}

/**
 * GET handler for the fallback AASA file
 */
export async function GET() {
  try {
    const content = getAASAContent();
    
    console.log(`Serving AASA file from fallback root path (Developer Mode)`);
    
    // Create response with proper headers for AASA files
    const response = new Response(JSON.stringify(content), {
      status: 200,
      headers: {
        // Apple requires application/json for AASA files
        "Content-Type": "application/json",
        // Cache control settings for better performance
        "Cache-Control": "public, max-age=3600",
        // CORS headers
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      }
    });
    
    return response;
  } catch (error) {
    console.error("Error serving fallback AASA file:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
} 