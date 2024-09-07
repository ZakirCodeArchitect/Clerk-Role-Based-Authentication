/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Image from 'next/image'; // Import Image component
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, useOrganization, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Link from 'next/link'; // Import Link component

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
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-slate-400 via-slate-700 to-slate-800 text-white flex flex-col items-center">
      <main className="flex flex-col gap-8 items-center sm:items-start">
        {/* New Section */}
        <section className="flex items-center justify-center min-h-full p-10 bg-gray-300 w-full max-w-7xl rounded-md">
          <div className="flex flex-col md:flex-row w-full">
            {/* Left Side: Text Content and Data */}
            <div className="flex-1 flex flex-col justify-center p-10">
              <h1 className="text-4xl md:text-5xl font-bold text-teal-900 mb-6">
                Tailored Access, Fortified Security
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-6">
                Streamline user access with our smart, role-based authentication. Secure, scalable, and seamless.
              </p>

              {/* Conditional Rendering of Insert Data Button */}
              <SignedIn>
                <div className="flex flex-col gap-4">
                  <Button
                    className="bg-gray-200 text-black hover:bg-gray-200 flex justify-center items-center px-4 py-2 w-24"
                    onClick={() => {
                      if (!orgId) {
                        return;
                      }
                      createFile({
                        name: "Semester 7",
                        orgId,
                      });
                    }}
                  >
                    Insert Data
                  </Button>

                  {/* Display Data Below Button */}
                  <div className="bg-gray-200 text-black p-4 rounded-md shadow-lg">
                  {files?.map((file) => (
                    <div key={file._id} className="bg-gray-100 text-black p-4 rounded-md shadow-lg">
                      {file.name}
                    </div>
                  ))}
                  </div>
                </div>
              </SignedIn>
              <SignedOut>
                <SignInButton>
                  <Button className="bg-gray-100 text-black hover:bg-gray-200 px-4 py-2 w-24">
                    Sign In
                  </Button>
                </SignInButton>
              </SignedOut>
            </div>

            {/* Right Side: Image */}
            <div className="flex-1 flex items-center justify-center p-4">
              <Image 
                src="/cyber4.jpg" 
                alt="Cyber Image" 
                layout="responsive"
                width={1200} 
                height={800} 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
