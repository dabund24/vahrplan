import { createClient } from "hafas-client";
import { profile as dbProfile } from "hafas-client/p/db/index.js";

const userAgent = "github.com/dabund24/vahrplan";

export const client = createClient(dbProfile, userAgent);
