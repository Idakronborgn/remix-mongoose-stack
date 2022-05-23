import { Form, useActionData } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import connectDb from "~/db/connectDb.server.js";

export async function action({ request }) {
  const form = await request.formData();
  const db = await connectDb();
  try {
    const newProfile = await db.models.Profile.create({ 
      // img: form.get("img"),
      title: form.get("title"),
      bio: form.get("bio"),
      hashtags: form.get("hashtags"),

     });
    return redirect(`/profiles/${newProfile._id}`);
  } catch (error) {
    return json(
      { errors: error.errors, values: Object.fromEntries(form) },
      { status: 400 }
    );
  }
}

export default function CreateProfile() {
  const actionData = useActionData();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create profile</h1>
      <Form method="post">
     
        <label htmlFor="title" className="block font-semibold mb-1">
          Title:
        </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          defaultValue={actionData?.values.title}
          className={
            actionData?.errors.title ? "border-2 border-red-500" : null
          }
        />

<label htmlFor="bio" className="block font-semibold mb-1">
          Bio text:
        </label>
        <textarea
          type="text"
          name="bio"
          id="bio"
          placeholder="Type your bio here"
          defaultValue={actionData?.values.bio}
          className={
            actionData?.errors.bio ? "border-2 border-red-500" : null
          }
        />

<label htmlFor="hashtags" className="block font-semibold mb-1">
          Hashtags:
        </label>
        <input
          type="text"
          name="hashtags"
          id="hashtags"
          placeholder="Give yourself a hashtag"
          defaultValue={actionData?.values.hashtags}
          className={
            actionData?.errors.hashtags ? "border-2 border-red-500" : null
          }
        />
        {actionData?.errors.title && (
          <p className="text-red-500 mt-1 mb-0">
            {actionData.errors.title.message}
          </p>
        )}
        <br />
        <button
          type="submit"
          className="mt-3 p-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded">
          Save
        </button>
      </Form>
    </div>
  );
}
