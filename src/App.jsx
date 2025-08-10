import { useState, useEffect } from "react";
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
    if (error) {
      setData({
        ...data,
        [name]: { value, error },
      });
    } else {
      setData({ ...data, [name]: { error: "", value } });
    }
  }

  function handleError(name, value) {
    const error = getError(name, value);
    if (error) {
      setData((prev) => ({
        ...prev,
        [name]: { value, error },
      }));
    }
    return error;
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
    let isError = false;
    event.preventDefault();
    Object.keys(data).forEach((name) => {
      const error = handleError(name, data[name].value);
      if (error) isError = true;
    });

    if (!isError) {
      handleSuccess();
    }
  }

  function handleSuccess() {
    // check each field error message if it's empty skip if not mark the status to false
    // it the status is false skip if not setSuccess to true

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

  useEffect(() => {
    let id;
    if (success) {
      id = setTimeout(() => {
        setSuccess(false);
      }, 5000);
      console.log(id);
    }
    return () => clearTimeout(id);
  }, [success]);

  return (
    <div className="font-karla bg-green-200 text-grey-900 text-base min-h-screen flex justify-center items-center relative">
      <Success isSuccess={success} />
      <main className="bg-white rounded-xl my-5 p-5 w-9/10 max-w-lg md:max-w-xl">
        <form>
          <h1 className="text-3xl font-bold text-grey-900 mb-2">Contact Us</h1>
          <div className="md:flex md:gap-3">
            <div className="grow">
              <Label name={"fname"}>First Name</Label>
              <Input
                name="fname"
                value={data.fname.value}
                onChange={handleFormChange}
                error={data.fname.error}
              />
            </div>

            <div className="grow">
              <Label name={"lname"}>Last Name</Label>
              <Input
                className="grow"
                name="lname"
                value={data.lname.value}
                onChange={handleFormChange}
                error={data.lname.error}
              />
            </div>
          </div>

          <Label name={"email"}>Email Address</Label>
          <Input
            name="email"
            type="email"
            value={data.email.value}
            onChange={handleFormChange}
            error={data.email.error}
          />

          <Label>Query Type</Label>
          <div className="md:flex md:gap-3">
            <Radio
              name="qType"
              value={"general"}
              checked={data.qType.value === "general"}
              onChange={handleFormChange}
            >
              General Enquiry
            </Radio>
            <Radio
              name="qType"
              value={"support"}
              checked={data.qType.value === "support"}
              onChange={handleFormChange}
            >
              Support Request
            </Radio>
          </div>
          <Error message={data.qType.error} />

          <Label name="message">Message</Label>
          <textarea
            name="message"
            id="message"
            value={data.message.value}
            onChange={(e) => handleFormChange("message", e.target.value)}
            className={`border border-grey-500 rounded-sm block my-2 w-full h-40 md:h-20  focus:outline-none focus:border-green-600 hover:border-green-600 resize-none ${
              data.message.error && "border-red focus:border-red"
            }`}
          />
          <Error message={data.message.error} />

          <div className="flex items-center mt-10">
            <input
              type="checkbox"
              name="consent"
              id="consent"
              checked={data.consent.value}
              className="hover:cursor-pointer accent-green-600 "
              onClick={() => handleFormChange("consent", !data.consent.value)}
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
