import { Presentation, PresentationFile } from "file:///C:/Users/320326546/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs";
const p=Presentation.create({slideSize:{width:1280,height:720}});const s=p.slides.add();
const x=s.shapes.add({geometry:"textbox",position:{left:10,top:10,width:300,height:80},fill:"none",line:{style:"solid",fill:"none",width:0}});
x.text="测试链接 ↗";x.text.style={fontSize:20,bold:true,color:"#ffffff",typeface:"Microsoft YaHei",alignment:"center",verticalAlignment:"middle",insets:{left:0,right:0,top:0,bottom:0}};
x.text.get("测试链接 ↗").link={uri:"https://example.com",isExternal:true};
s.speakerNotes.textFrame.setText("talk\n\n[Sources]\n- https://example.com");
const out=await PresentationFile.exportPptx(p);await out.save("C:/petproject/.ppt_work/min.pptx");console.log("ok");
