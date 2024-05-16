import { ChevronDown, ChevronUp, Download, Plus } from 'react-feather';

function UserDetails() {
  return (
    <section>
      <article className="flex-col mx-auto mb-4 pl-4 py-4 border-b border-gray-700">
        <img
          src="/Selena.png"
          alt="Selena Gomez smiling"
          className="w-32 h-32 rounded-full object-cover mb-2 mx-auto"
        />
        <h2 className="text-center font-semibold mb-2">Selena Gomez</h2>
        <p className="text-sm text-center">Lorem ipsum dolor sit amet.</p>
      </article>

      <aside>
        <ul className="px-4">
          <li className="flex justify-between mb-4">
            <span>Chat Settings</span>
            <ChevronUp className="cursor-pointer" />
          </li>

          <li className="flex justify-between mb-4">
            <span>Privacy & help</span>
            <ChevronUp className="cursor-pointer" />
          </li>

          <li className="flex-col mb-4">
            <div className="flex justify-between mb-2">
              <span>Shared photos</span>
              <ChevronDown className="cursor-pointer" />
            </div>

            <figure className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <img
                  src="/TSCat.jpg"
                  alt="cat"
                  className="h-8 w-8 rounded-md"
                />
                <span className="text-sm text-gray-400">meredith.jpg</span>
              </div>
              <Download className="cursor-pointer" />
            </figure>
          </li>

          <li className="flex justify-between mb-4">
            <span>Shared Files</span>
            <Plus className="cursor-pointer" />
          </li>
        </ul>
      </aside>

      <button
        type="button"
        className="mx-4 text-sm text-red-700 font-semibold hover:text-red-500"
      >
        Block User
      </button>
    </section>
  );
}

export default UserDetails;
