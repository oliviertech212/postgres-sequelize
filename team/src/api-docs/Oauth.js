import passport from "passport";

export default {
  "/auth/google": {
    get: {
      security: [
        {
          googleAuth: ["https://www.googleapis.com/auth/userinfo.profile"]
        }
      ],
      summary: "Authenticate with Google",
      description:
        "This endpoint initiates the authentication flow with Google.",
      responses: {
        200: {
          description: "Redirects to the Google authentication page.",
          headers: {
            Location: {
              schema: {
                type: "string",
                format: "url"
              }
            }
          }
        }
      },
      tags: ["Authentication"],
      parameters: [],
      requestBody: {},
      middleware: [
        passport.authenticate("google", {
          session: false,
          failureRedirect: "http://localhost:5000/auth/google/redirect",
          scope: ["profile", "email"]
        })
      ],
      "x-swagger-router-controller": "Oauthroute",
      operationId: "googleOauth"
    }
  },

  "/auth/google/redirect": {
    security: [
      {
        googleAuth: ["https://www.googleapis.com/auth/userinfo.profile"]
      }
    ],
    get: {
      summary: "Handle Google authentication callback",
      description:
        "This endpoint handles the Google authentication callback and generates a JWT token.",
      parameters: [
        {
          name: "code",
          in: "query",
          description: "The authorization code returned by Google.",
          required: true,
          schema: {
            type: "string"
          }
        }
      ],
      responses: {
        200: {
          description:
            "Redirects to the frontend app with the JWT token as a query parameter.",
          headers: {
            Location: {
              schema: {
                type: "string",
                format: "uri"
              }
            }
          }
        },
        401: {
          description: "Unauthorized"
        }
      },
      tags: ["Authentication"],
      security: [
        {
          googleAuth: ["https://www.googleapis.com/auth/userinfo.profile"]
        }
      ],
      middleware: []
    }
  }
};
