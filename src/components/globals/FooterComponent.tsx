"use client";
import Globals from "@/modules/Globals";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import JsLoader from "@/modules/JsLoader";
import { Mail, MapPin, MapPinned, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function FooterComponent() {
  const [pageData, setPageData] = useState<any | null>(null);

  useEffect(() => {
    Globals.KontentClient.item("global_component_2026")
      .withParameter("depth", "4")
      .toObservable()
      .subscribe((response: any) => {
        setPageData(response.item);
      });
  }, []);

  if (!pageData) {
    return null;
  }

  const menuItems = pageData.menuitems.value as unknown as any[];
  return (
    <div className="relative py-8 sm:py-12">
      <img
        src={pageData.footerimage.value[0]?.url}
        alt={pageData.footerimage.value[0]?.name}
        className="w-full h-full object-cover absolute inset-0"
      />
      <footer className="footer-component-wrapper relative z-10">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <p className="text-white mb-5">
                {pageData.organizedbytext.value}
              </p>
              <Link href="/">
                {pageData.organizedbylogo.value[0] && (
                  <img
                    src={pageData.organizedbylogo.value[0].url}
                    alt="Logo"
                    className="w-48 object-contain"
                  />
                )}
              </Link>

              <div className="flex gap-3 mt-10">
                <Link href={pageData.linkedinlink.value} target="_blank" className="bg-white rounded-full p-2">
                  <FaLinkedinIn
                    className=" hover:scale-75 transition duration-75 ease-in"
                    size={24}
                  />
                </Link>

                <Link href={pageData.facebooklink.value} className="bg-white rounded-full p-2">
                  <FaFacebookF
                    className=" hover:scale-75 transition duration-75 ease-in"
                    size={24}
                  />
                </Link>

                <Link href={pageData.xtwiterlink.value} className="bg-white rounded-full p-2">
                  <FaXTwitter
                    className=" hover:scale-75 transition duration-75 ease-in"
                    size={24}
                  />
                </Link>

                <Link href={pageData.youtubelink.value} className="bg-white rounded-full p-2">
                  <FaYoutube
                    className=" hover:scale-75 transition duration-75 ease-in"
                    size={24}
                  />
                </Link>

                <Link href={pageData.instagramlink.value} className="bg-white rounded-full p-2">
                  <FaInstagram
                    className="text-primary-orange hover:scale-75 transition duration-75 ease-in"
                    size={24}
                  />
                </Link>
              </div>
            </div>

            <div className="flex sm:flex-row flex-col justify-between gap-5">
              <nav className="flex flex-col gap-3">
                {menuItems.map((item) => {
                  const name = item.name.value;
                  const link = item.link.value;
                  const target =
                    item.isexternal.value === "Yes" ? "_blank" : "_self";
                  const children = item.items.value as any[];

                  return (
                    <div key={item.system.id} className="relative group ">
                      <Link
                        href={link}
                        target={target}
                        className="px-3 py-2 
                    
                   text-white
                   text-md
                     hover:text-primary-orange
                    transition-colors duration-200"
                      >
                        <span className="text-sm capitalize"> {name}</span>
                      </Link>
                    </div>
                  );
                })}
              </nav>

              <div>
                <div className="text-white mb-4">
                  <p className="mb-2 text-lg">Contact Us</p>
                  <hr className="mb-2" />
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-2 items-center">
                      <Phone className="fill-white" size={14} />
                      <p>{pageData.mobile.value}</p>
                    </div>

                    <div className="flex gap-2 items-center">
                      <Mail size={14} />
                      <p>{pageData.email.value}</p>
                    </div>
                  </div>
                </div>

                <div className="text-white">
                  <p className="mb-2 text-lg">Address</p>
                  <hr className="mb-2" />
                  <div className="flex gap-2 items-center">
                    <MapPinned size={14} />
                    <p className="">{pageData.address.value}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
