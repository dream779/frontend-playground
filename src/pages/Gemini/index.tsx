import { useCallback, useRef, useState } from "react";
import styles from "./index.module.less";
import { Button, Input, Space } from "antd";
import model from "./model";
import {
  GoogleCircleFilled,
  SendOutlined,
  SmileFilled,
} from "@ant-design/icons";
import theme from "../../theme";
import Markdown from "markdown-to-jsx";
import cx from "classnames";

type ChatList = Array<{
  role: "User" | "Gemini";
  content: string;
  status: "loading" | "finish" | "error";
}>;

export default function Gemini() {
  const [text, setText] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatList, setChatList] = useState<ChatList>([]);
  const chatRef = useRef(null);
  const renderText = (chunkText: string, index: number) => {
    if (index >= chunkText.length) {
      return;
    }
    setContent((v) => (v += chunkText.slice(index, index + 4)));
    chatScrollBottom("instant");
    requestAnimationFrame(() => renderText(chunkText, index + 4));
  };
  const startRender = async (text: string) => {
    requestAnimationFrame(() => renderText(text, 0));
  };

  const chatScrollBottom = useCallback(
    (behavior?: "smooth" | "instant" | "auto") => {
      setTimeout(() => {
        if (chatRef.current) {
          const { scrollHeight, clientHeight } = chatRef.current;
          const maxScrollTop = scrollHeight - clientHeight;
          chatRef.current.scrollTo({
            top: maxScrollTop,
            behavior: behavior || "smooth",
          });
        }
      }, 10);
    },
    []
  );

  const run = async () => {
    if (loading || !text) return;
    try {
      setContent("");
      setChatList((v: any) => [
        ...v,
        { role: "User", content: text, status: "finish" },
      ]);
      setText("");
      setLoading(true);
      chatScrollBottom();
      let cur = "";
      const parts = [{ text: text }];
      const result = await model.generateContentStream({
        contents: [{ role: "User", parts }],
      });
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        cur += chunkText;
        await startRender(chunkText);
      }
      setChatList((v: any) => [
        ...v,
        {
          role: "Gemini",
          content: cur,
          status: "finish",
        },
      ]);
    } catch (error) {
      setChatList((v: any) => [
        ...v,
        {
          role: "Gemini",
          content: "Network error.",
          status: "error",
        },
      ]);
      setContent("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Gemini-Pro</div>
      <div className={styles.chat} id="chat-list" ref={chatRef}>
        {Array.isArray(chatList) &&
          chatList.map((item, index) => {
            if (item.status !== "loading") {
              return (
                <div
                  key={item.content + index}
                  className={cx(styles.chatItem, {
                    [styles.userItem]: item.role === "User",
                  })}
                >
                  <div className={styles.head}>
                    {item.role === "User" && (
                      <SmileFilled
                        style={{ color: theme.color_8, fontSize: 32 }}
                      />
                    )}
                    {item.role === "Gemini" && (
                      <GoogleCircleFilled
                        style={{ color: theme.color_8, fontSize: 32 }}
                      />
                    )}

                    <div className={styles.name}>{item?.role}</div>
                  </div>
                  <div className={styles.text}>
                    <Markdown>
                      {`<span className='${cx(styles.textInner)}'>${
                        item?.content
                      }</span>`}
                    </Markdown>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        {loading && (
          <div className={styles.chatItem}>
            <div className={styles.head}>
              <GoogleCircleFilled
                style={{ color: theme.color_8, fontSize: 32 }}
              />
              <div className={styles.name}>Gemini</div>
            </div>
            <div className={styles.text}>
              <Markdown>
                {`<span className='${cx(styles.textInner, {
                  [styles.loading]: loading,
                })}'>${content}</span>`}
              </Markdown>
              {!content && loading && (
                <span className={styles.blinking}>|</span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className={styles.bottom}>
        <Space.Compact style={{ width: "100%" }}>
          <Input
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            className={styles.input}
            onPressEnter={(e: any) => {
              if (e.isComposing || e.keyCode === 229) {
                e.preventDefault();
                return;
              }
              if (!e.shiftKey) {
                e.preventDefault();
                run();
              }
            }}
          />
          <Button
            onClick={run}
            icon={<SendOutlined />}
            className={styles.btn}
            type="primary"
          >
            Send
          </Button>
        </Space.Compact>
      </div>
    </div>
  );
}
