import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateCampaign(): JSX.Element {
    let navigate = useNavigate();

    interface IValues {
        [key: string]: any;
    }

    const [values, setValues] = useState<IValues>([]);
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        const formData = {
            name: values.name,
            description: values.description,
            discountCodes: values.discountCodes,
        }

        const submitSuccess: boolean = await submitForm(formData);
        setSubmitSuccess(submitSuccess);
        setValues({...values, formData});
        setLoading(false);
        navigate('/');
    }

    const submitForm = async (formData: {}) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/campaign`, {
                method: "post",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }),
                body: JSON.stringify(formData)
            });
            return response.ok;
        } catch(err) {
            return false;
        }
    }

    const setFormValues = (formValues: IValues) => {
        setValues({
            ...values,
            ...formValues
        })
    }

    const handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFormValues({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }


    return (
        <div>
        <div className={"col-md-12 form-wrapper"}>
          <h2> Create Campaign </h2>
          {!submitSuccess && (
            <div className="alert alert-info" role="alert">
              Fill the form below to create a new campaign.
                    </div>
          )}
          {submitSuccess && (
            <div className="alert alert-info" role="alert">
              The form was successfully submitted!
                            </div>
          )}
          <form id={"create-post-form"} onSubmit={handleFormSubmission} noValidate={true}>
            <div className="form-group col-md-12">
              <label htmlFor="name"> Name </label>
              <input type="text" id="name" onChange={(e) => handleInputChanges(e)} name="name" className="form-control" placeholder="Enter Campaign Name" />
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="description"> Description </label>
              <input type="text" id="description" onChange={(e) => handleInputChanges(e)} name="description" className="form-control" placeholder="Enter Description" />
            </div>

            <div className="form-group col-md-12">
              <label htmlFor="discountCodes"> discountCodes </label>
              <input type="text" id="discountCodes" onChange={(e) => handleInputChanges(e)} name="discountCodes" className="form-control" />
            </div>
            <div className="form-group col-md-4 pull-right">
              <button className="btn btn-success" type="submit">
                Create Campaign
              </button>
              {loading &&
                <span className="fa fa-circle-o-notch fa-spin" />
              }
            </div>
          </form>
        </div>
      </div>
    )

}
export default CreateCampaign;