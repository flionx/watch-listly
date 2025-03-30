// '2025-03-20' to 'March 20, 2025'
export function formatDate(dateStr: string): string {
    const date = new Date(dateStr); 

    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
}

//125 to '02h 5m'
export function formatTime(mins: number): string {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return `${hours > 10 ? hours : '0'+ hours}h ${minutes}m`
}

// 1200000 to '1 200 000
export function formatBudget(num: number): string {
    return num.toLocaleString('fr'); 
}