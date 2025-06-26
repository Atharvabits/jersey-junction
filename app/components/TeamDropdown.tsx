"use client";

import { useState, Suspense, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

interface TeamDropdownProps {
  teams: string[];
  currentTeam?: string;
  categorySlug: string;
}

function TeamDropdownInner({ teams, currentTeam, categorySlug }: TeamDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleTeamSelect = (team: string | null) => {
    const params = new URLSearchParams(searchParams);
    
    if (team) {
      params.set('team', team.toLowerCase().replace(/\s+/g, '-'));
    } else {
      params.delete('team');
    }
    
    const newUrl = `/${categorySlug}${params.toString() ? '?' + params.toString() : ''}`;
    router.push(newUrl);
    setIsOpen(false);
  };

  const formatTeamName = (teamSlug?: string) => {
    if (!teamSlug) return "All Teams";
    return teamSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const currentTeamName = currentTeam ? formatTeamName(currentTeam) : "All Teams";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="appearance-none bg-white border-2 border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between min-w-[180px] shadow-sm transition-all duration-200"
      >
        <span className="truncate">{currentTeamName}</span>
        <ChevronDown className={`w-4 h-4 ml-2 transform transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full min-w-[240px] bg-white border-2 border-gray-300 rounded-lg shadow-2xl z-[9999] animate-in fade-in-0 zoom-in-95 duration-200">
          <div className="py-2 max-h-[300px] overflow-y-auto">
            {/* All Teams option */}
            <button
              onClick={() => handleTeamSelect(null)}
              className={`w-full text-left px-4 py-3 text-sm font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 ${
                !currentTeam ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-500' : 'text-gray-700'
              }`}
            >
              All Teams
            </button>
            
            {/* Individual teams */}
            {teams.map((team) => {
              const teamSlug = team.toLowerCase().replace(/\s+/g, '-');
              const isSelected = currentTeam === teamSlug;
              
              return (
                <button
                  key={team}
                  onClick={() => handleTeamSelect(team)}
                  className={`w-full text-left px-4 py-3 text-sm font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 ${
                    isSelected ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-500' : 'text-gray-700'
                  }`}
                >
                  {team}
                </button>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}

export default function TeamDropdown(props: TeamDropdownProps) {
  return (
    <Suspense fallback={
      <div className="appearance-none bg-white border-2 border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 min-w-[180px] shadow-sm">
        <span>Loading...</span>
      </div>
    }>
      <TeamDropdownInner {...props} />
    </Suspense>
  );
} 