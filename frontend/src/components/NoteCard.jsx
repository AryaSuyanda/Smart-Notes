function NoteCard({ title, content, date, onShare, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-[#2B2B2B] flex flex-col text-white rounded-2xl p-6 shadow-lg transition-all duration-300 ease-in-out cursor-pointer hover:shadow-blue-500/20 hover:-translate-y-1 border border-transparent hover:border-blue-500/30 min-h-[240px]"
    >
      <h2 className="text-xl font-bold mb-3 truncate">{title}</h2>
      
      <p className="text-sm text-gray-300 line-clamp-4 flex-grow">
        {content}
      </p>
      
      <div className="mt-auto pt-5 border-t border-gray-700/50">
        <div className="flex items-center justify-between">
            <span className="text-[11px] text-gray-400 font-medium">{date}</span>
            <button
              className="bg-[#3471FF] hover:bg-blue-600 text-white font-semibold text-xs py-1.5 px-4 rounded-lg transition duration-200"
              onClick={(e) => {
                e.stopPropagation();
                onShare();
              }}
            >
              Share
            </button>
        </div>
      </div>
    </div>
  );
}

export default NoteCard;