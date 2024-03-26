import React from 'react';
import {
  Page,
  Layout,
  LegacyCard,
  FormLayout,
  TextField,
  TextContainer,
  Text,
} from '@shopify/polaris';

// Components Importing
import { VideoExample } from '../components/menu/menu_video';
import { DropZoneExample } from '../components/menu/menu_drop';
import {BookCall} from '../components/menu/menu_book_call_button';
import {Section} from '../components/menu/menu_section1';
import { Section2 } from '../components/menu/menu_section2';

export default function AdditionalPage() {
  return (
    <Page>
      <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-10 flex justify-center items-center mb-12">
        <h1 className="text-6xl font-bold">Settings</h1>
      </div>
      <Section />
      <div style={{ marginTop: 'var(--p-space-1200)' }}>
        <VideoExample />
      </div>
      <div className="bg-gradient-to-r p-10 flex justify-center items-center mb-2 mt-10">
        <h1 className="text-3xl font-bold justify-center"> Please upload the logo that you would like to have</h1>

      </div>

      
      <DropZoneExample />


      <div className='mt-10'>
        <Section2 />
      </div>


      <div className="bg-gradient-to-r p-10 flex justify-center items-center mb-12">
        <BookCall />
      </div>



    </Page>
  );
}


