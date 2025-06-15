function NoteCard({ title, content, date, onShare }) {
  return (
    <div className="bg-[#262626] flex flex-col text-white rounded-2xl p-6 
             shadow-md transition-all duration-200 ease-in-out 
             transform cursor-pointer 
             hover:bg-[#2b2b2b] hover:shadow-xl hover:scale-105">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>

      <p className="text-sm text-white line-clamp-2">
        {content}
      </p>

      {/* Bagian bawah: tetap di bawah terlepas dari isi */}
      <div className="flex items-end justify-between mt-auto pt-6">
        <button
          className="bg-[#3471FF] hover:bg-blue-600 text-white font-bold py-1 px-2 rounded-[6px] transition duration-200"
          onClick={onShare}
        >
          share
        </button>
        <span className="text-[12px] text-gray-300">{date}</span>
      </div>
    </div>
  );
}

export default NoteCard;
