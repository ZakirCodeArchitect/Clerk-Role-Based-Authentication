/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignOutButton, useOrganization, useSession, useUser } from "@clerk/nextjs";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { getFiles } from '../../convex/file';


export default function Home() {

  const organization = useOrganization();
  const user = useUser();

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(api.file.getFiles, orgId ? { orgId } : 'skip');
  const createFile = useMutation(api.file.createFile);

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 text-white flex justify-center items-center" >
      <main className="flex flex-col gap-8 items-center sm:items-start">
        {/* Signed In/Out buttons can go here */}
        {files?.map((file) => {
          return <div key={file._id} className="bg-white text-black p-4 rounded-md shadow-lg">
            {file.name}
          </div>;
        })}

        <Button
          className="bg-white text-black hover:bg-gray-200 flex justify-center items-center"
          onClick={() => {
            if (!orgId) {
              return;
            }
            createFile({
              name: "Hello World",
              orgId,
            });
          }}
        >
          Insert Data
        </Button>
      </main>
    </div>
  );
}
