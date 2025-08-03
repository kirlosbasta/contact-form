import { useState } from "react";
import Input from "./components/Input";
import Label from "./components/Label";
import Radio from "./components/Radio";
import Success from "./components/Success";
import Error from "./components/Error";

function App() {
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState({
    fname: { value: "", error: "" },
    lname: { value: "", error: "" },
    email: { value: "", error: "" },
    qType: { value: "", error: "" },
    message: { value: "", error: "" },
    consent: { value: false, error: "" },
  });

  function handleFormChange(name, value) {
    const error = getError(name, value);
    console.log(data);
    if (error) {
      setData({
        ...data,
        [name]: { value, error },
      });
    } else {
      setData({ ...data, [name]: { error: "", value } });
    }
  }

  /**
   * Get Error message after validating the input
   * @param {String} name name of the input
   * @param {String} value It's value
   *
   * @returns {String} Empty string if valid or Error message
   */
  function getError(name, value) {
    let error = "";

    switch (name) {
      case "consent":
        error =
          !value && "To submit this form, please consent to being contacted";
        break;
      case "email":
        error = !isEmail(value) && "Please enter a valid email address";
        break;
      case "qType":
        error = !value && "Please select a query type";
        break;
      default:
        error = !value && "This field is required";
        break;
    }

    return error;
  }

  function isEmail(value) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value);
  }

  function handleSubmit(event) {
    // check each field if it's valid or not
    // if not pass in an error message to the field
    // if all fields is set corretly display success message and clear all the fields

    event.preventDefault();
    Object.keys(data).forEach((name) => {
      handleFormChange(name, data[name].value);
    });
    handleSuccess();
  }

  function handleSuccess() {
    // check each field error message if it's empty skip if not mark the status to false
    // it the status is false skip if not setSuccess to true
    let status = true;
    Object.keys(data).forEach((name) => {
      const error = data[name].error;

      if (error !== "") {
        status = false;
      }
    });
    if (status) {
      setSuccess(true);
      setData({
        fname: { value: "", error: "" },
        lname: { value: "", error: "" },
        email: { value: "", error: "" },
        qType: { value: "", error: "" },
        message: { value: "", error: "" },
        consent: { value: false, error: "" },
      });
    }
  }
  return (
    <div className="font-karla bg-green-200 text-grey-900 text-base min-h-screen flex justify-center items-center relative">
      {success && <Success />}
      <main className="bg-white rounded-xl my-5 p-5 w-9/10 max-w-lg md:max-w-xl">
        <form>
          <h1 className="text-3xl font-bold text-grey-900 mb-2">Contact Us</h1>
          <div className="md:flex md:gap-2">
            <legend className="grow">
              <Label name={"fname"}>First Name</Label>
              <Input
                name="fname"
                onChange={handleFormChange}
                error={data.fname.error}
              />
            </legend>

            <legend className="grow">
              <Label name={"lname"}>Last Name</Label>
              <Input
                className="grow"
                name="lname"
                onChange={handleFormChange}
                error={data.lname.error}
              />
            </legend>
          </div>

          <Label name={"email"}>Email Address</Label>
          <Input
            name="email"
            type="email"
            onChange={handleFormChange}
            error={data.email.error}
          />

          <Label>Query Type</Label>
          <Radio name="qType" value={"general"} onChange={handleFormChange}>
            General Enquiry
          </Radio>
          <Radio name="qType" value={"support"} onChange={handleFormChange}>
            Support Request
          </Radio>
          <Error message={data.qType.error} />

          <Label name="message">Message</Label>
          <textarea
            name="message"
            id="message"
            onChange={(e) => handleFormChange("message", e.target.value)}
            className="border border-grey-500 rounded-sm block my-2 w-full h-40  focus:outline-none focus:border-green-600 resize-none"
          />
          <Error message={data.message.error} />

          <div className="flex items-center mt-10">
            <input
              type="checkbox"
              name="consent"
              id="consent"
              className="hover:cursor-pointer accent-green-600 "
              onClick={() => handleFormChange("consent", !data.consent)}
            />
            <label
              htmlFor="consent"
              className="inline-block ml-3 hover:cursor-pointer"
            >
              I consent to being contacted by the team{" "}
              <span className="text-green-600">*</span>
            </label>
          </div>
          <Error message={data.consent.error} />
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full text-white bg-green-600 py-3 rounded-md mt-10 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;
