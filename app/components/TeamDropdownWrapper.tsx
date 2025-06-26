"use client";

import { Suspense } from "react";
import TeamDropdown from "./TeamDropdown";

interface TeamDropdownWrapperProps {
  teams: string[];
  currentTeam?: string;
  categorySlug: string;
}

export default function TeamDropdownWrapper(props: TeamDropdownWrapperProps) {
  return (
    <div className="flex-shrink-0 relative z-10">
      <Suspense fallback={
        <div className="appearance-none bg-white border-2 border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 min-w-[180px] shadow-sm">
          <span>Loading...</span>
        </div>
      }>
        <TeamDropdown {...props} />
      </Suspense>
    </div>
  );
} 