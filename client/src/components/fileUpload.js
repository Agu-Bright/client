import React from "react";
const FileUpload = ({ submit, onChange, name, isSubmit, setIsSubmit }) => {
  return (
    <>
      <form onSubmit={submit}>
        <div>
          <label>{name}</label>
          <input type="file" onChange={onChange} />
        </div>
        <input
          style={{ border: "none", padding: "2px", backgroundColor: "skyblue" }}
          type="submit"
          value={isSubmit}
          onClick={() => setIsSubmit("loading")}
        />
      </form>
    </>
  );
};

export default FileUpload;
