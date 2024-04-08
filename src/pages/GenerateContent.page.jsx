import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { profileApi } from "../apis/usersApi";
import Loader from "../components/Loader.component";
import StatusMessage from "../components/StatusMessage.component";
import { generateContentApi } from "../apis/aiApi";
import ReactMarkdown from "react-markdown";
const Content = () => {
  const [generatedContent, setGeneratedContent] = useState("");
  const mutation = useMutation({
    mutationFn: generateContentApi,
  });
  console.log(mutation?.data?.content);
  // Formik setup for handling form data
  const formik = useFormik({
    initialValues: {
      prompt: "",
    },
    validationSchema: Yup.object({
      prompt: Yup.string().required("A prompt is required"),
    }),
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });
  useEffect(() => {
    if (mutation.isSuccess) {
      setGeneratedContent(mutation?.data?.content);
    }
  }, [mutation]);
  const { data, isLoading, isError, isSuccess, error } = useQuery({
    queryFn: profileApi,
    queryKey: ["profile"],
  });
  if (isLoading) return <Loader />;
  if (isError)
    return (
      <StatusMessage
        type={"loading"}
        message={error?.response?.data?.message}
      />
    );
  if (isSuccess)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-900 flex justify-center items-center p-6">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-2xl w-full p-6">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
            AI Content Generator
          </h2>

          {/* Static display for Plan and Credits */}
          <div className="flex flex-wrap gap-2">
            <div className="mb-3">
              <span className="text-sm font-semibold bg-green-300 px-4 py-1 rounded-md">
                Plan : {data?.user?.subscriptionPlan}
              </span>
            </div>
            <div className="mb-3">
              <span className="text-sm font-semibold bg-green-300 px-4 py-1 rounded-md">
                Credits : {data?.user?.apiRequestCount} /{" "}
                {data?.user?.monthlyRequestCount}
              </span>
            </div>
            <Link to="/history" className="text-blue-600">
              View history
            </Link>
          </div>

          {/* Form for generating content */}
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Prompt input field */}
            <div>
              <label
                htmlFor="prompt"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Enter a prompt of your idea
              </label>
              <input
                id="prompt"
                type="text"
                {...formik.getFieldProps("prompt")}
                className="px-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter a topic or idea"
              />
              {formik.touched.prompt && formik.errors.prompt && (
                <div className="text-red-500 mt-1">{formik.errors.prompt}</div>
              )}
            </div>
            {mutation?.isPending && (
              <StatusMessage
                type={"loading"}
                message={"Loading Please Wait..."}
              />
            )}
            {mutation?.isSuccess && (
              <StatusMessage
                type={"success"}
                message={"Content Generated 🎉"}
              />
            )}
            {mutation?.isError && (
              <StatusMessage
                type={"error"}
                message={mutation?.error?.response?.data?.message}
              />
            )}
            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Generate Content
            </button>
          </form>

          {/* Display generated content */}
          {generatedContent && (
            <div className="mt-6 p-4 bg-gray-100 rounded-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Generated Content:
              </h3>
              <p className="text-gray-900 overflow-auto">
                <ReactMarkdown children={generatedContent} />
              </p>
            </div>
          )}
        </div>
      </div>
    );
};

export default Content;
