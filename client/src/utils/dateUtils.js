  export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const diffInMilliseconds = now - date;
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else if (diffInDays === 1)
      return `${diffInDays} day ago`;
    else if (diffInDays <= 2) {
      return `${diffInDays} days ago`;
    } else {
      return date.toLocaleDateString("de-DE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    }
  };
