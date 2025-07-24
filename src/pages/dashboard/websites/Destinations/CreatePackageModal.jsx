import React from 'react'

const CreatePackageModal = () => {


   const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const fd = new FormData();
      fd.append("packageImage", form.packageImage);
      fd.append("destinationId", form.destinationId);
      fd.append("packageName", form.packageName);
      fd.append("totalDaysNight", form.totalDaysNight);
      fd.append("packagePrice", form.packagePrice);
      fd.append("theme", form.theme);
      fd.append("AboutPackage", form.AboutPackage);
      form.packageSummery.forEach((item, idx) => {
        fd.append(`packageSummery[${idx}][day]`, item.day);
        fd.append(`packageSummery[${idx}][about]`, item.about);
      });
      fd.append("accessToken", accessToken); // send token in payload

      console.log("Form Data:", fd);
      
      const res =await api.post(`/package`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": accessToken, // send token in headers
        },
      });
      console.log("RES CREATE PACKAGE", res);    
      setShowCreate(false);
      setForm({
        packageImage: null,
        destinationId: "",
        packageName: "",
        totalDaysNight: "",
        packagePrice: "",
        theme: "",
        AboutPackage: "",
        packageSummery: [{ day: "", about: "" }],
      });
      setImagePreview(null);
      fetchPackages();
    } catch (err) {
      alert("Failed to create package");
    } finally {
      setCreating(false);
    }
  };
  return (

        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form onSubmit={handleCreate} className="bg-white p-6 rounded shadow w-full max-h-[70vh] max-w-lg overflow-y-auto relative" encType="multipart/form-data">
            {/* Close button */}
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl font-bold focus:outline-none"
              onClick={() => { setShowCreate(false); setImagePreview(null); }}
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-xl font-semibold mb-4">Create Package</h3>
            <div className="mb-2">
              <label className="block mb-1 font-medium">Image</label>
              <input type="file" name="packageImage" accept="image/*" onChange={handleFormChange} className="border px-3 py-2 rounded w-full" required />
              {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-24 rounded" />}
            </div>
            <div className="mb-2">
              <label className="block mb-1 font-medium">Destination</label>
              <select name="destinationId" value={form.destinationId} onChange={handleFormChange} className="border px-3 py-2 rounded w-full" required>
                <option value="">Select Destination</option>
                {DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
            <input name="packageName" value={form.packageName} onChange={handleFormChange} placeholder="Package Name" className="border px-3 py-2 rounded w-full mb-2" required />
            <input name="totalDaysNight" value={form.totalDaysNight} onChange={handleFormChange} placeholder="Total Days / Nights" className="border px-3 py-2 rounded w-full mb-2" required />
            <input name="packagePrice" value={form.packagePrice} onChange={handleFormChange} placeholder="Price" type="number" className="border px-3 py-2 rounded w-full mb-2" required />
            <input name="theme" value={form.theme} onChange={handleFormChange} placeholder="Theme (e.g. Romantic)" className="border px-3 py-2 rounded w-full mb-2" required />
            <textarea name="AboutPackage" value={form.AboutPackage} onChange={handleFormChange} placeholder="About Package" className="border px-3 py-2 rounded w-full mb-2" required />
            <div className="mb-2">
              <label className="block mb-1 font-medium">Package Summery</label>
              {form.packageSummery.map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-2 items-center">
                  <input
                    type="text"
                    placeholder="Day"
                    value={item.day}
                    onChange={e => handleSummeryChange(idx, "day", e.target.value)}
                    className="border px-2 py-1 rounded w-24"
                    required
                  />
                  <input
                    type="text"
                    placeholder="About"
                    value={item.about}
                    onChange={e => handleSummeryChange(idx, "about", e.target.value)}
                    className="border px-2 py-1 rounded flex-1"
                    required
                  />
                  {form.packageSummery.length > 1 && (
                    <button type="button" onClick={() => removeSummeryDay(idx)} className="text-red-500 px-2">✕</button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addSummeryDay} className="text-blue-500 text-sm mt-1">+ Add Day</button>
            </div>
            <div className="flex gap-2 mt-2">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={creating}>{creating ? "Creating..." : "Create"}</button>
              <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={() => { setShowCreate(false); setImagePreview(null); }}>Cancel</button>
            </div>
          </form>
        </div>
      
  )
}

export default CreatePackageModal;